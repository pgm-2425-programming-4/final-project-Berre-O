import { useState } from "react";

function OpenDialog({ task, onChangeState }) {
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
    <dialog open>
      <h2>{task.Title}</h2>
      <p>{task.Description}</p>
      <div>
        <button onClick={() => handleChangeState("Uncomplete")}>
          Uncomplete
        </button>
        <button onClick={() => handleChangeState("Progress")}>
          In Progress
        </button>
        <button onClick={() => handleChangeState("Review")}>
          Under Review
        </button>
        <button onClick={() => handleChangeState("Complete")}>Complete</button>
      </div>
      <p>Current state: {currentState}</p>
    </dialog>
  );
}

export default OpenDialog;
