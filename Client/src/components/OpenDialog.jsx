import { useState } from "react";

function OpenDialog({ task, onChangeState, onClose }) {
  const [currentState, setCurrentState] = useState(
    task.task_status.CurrentStatus
  );

  const handleChangeState = (newState) => {
    setCurrentState(newState);
    if (onChangeState) {
      onChangeState(newState);
    }
  };

  return (
    <dialog open className="dialog">
      <div className="dialog__header">
          <h2 className="dialog__title">{task.Title}</h2>
          <button onClick={onClose} className="btn btn--destructive">
            Close
          </button>
      </div>
      <p className="dialog__content">{task.Description}</p>
      <div className="dialog__btns">
        <button className="btn" onClick={() => handleChangeState("Uncomplete")}>
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
      <p>Current state: {currentState}</p>
    </dialog>
  );
}

export default OpenDialog;

