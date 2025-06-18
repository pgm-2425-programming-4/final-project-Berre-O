import { useState } from "react";
import { updateTask } from "../queries/updateTask.jsx";
import { useQuery } from "@tanstack/react-query";
import { getStates } from "../queries/getStates";
import { useRouter } from "@tanstack/react-router";

function OpenDialog({ task, onClose }) {
  const router = useRouter();
  const [currentState, setCurrentState] = useState(
    task.task_status.CurrentStatus
  );

  const { data: statusData } = useQuery({
    queryKey: ["task-statuses"],
    queryFn: () => getStates(),
  });

  const handleChangeState = (newState) => {
    setCurrentState(newState);
    if (!statusData) return;
    const newStateObj = statusData.data.find(
      (state) => state.CurrentStatus === newState
    );
    if (updateTask && newStateObj) {
      const data = {
        data: {
          task_status: newStateObj.documentId,
        },
      };
      updateTask(data, task.documentId);
      router.invalidate();
    }
  };

  return (
    <dialog open className="dialog dialog--sm">
      <div className="dialog__header">
        <h2 className="dialog__title">{task.Title}</h2>
        <button onClick={onClose} className="btn btn--destructive">
          Close
        </button>
      </div>
      <div className="dialog__content">
        <p className="dialog__desc">{task.Description}</p>
        <p>Current state: {currentState}</p>
        <div className="dialog__btns">
          <button className="btn" onClick={() => handleChangeState("Backlog")}>
            Backlog
          </button>
          <button
            className="btn"
            onClick={() => handleChangeState("Uncomplete")}
          >
            Uncomplete
          </button>
          <button className="btn" onClick={() => handleChangeState("Progress")}>
            In Progress
          </button>
          <button className="btn" onClick={() => handleChangeState("Review")}>
            Under Review
          </button>
          <button className="btn" onClick={() => handleChangeState("Complete")}>
            Complete
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default OpenDialog;
