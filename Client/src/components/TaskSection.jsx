import { useState } from "react";
import OpenDialog from "./OpenDialog.jsx";

function TaskSection({ title, tasks }) {
  const [openTask, setOpenTask] = useState(null);

  let modifier = "";
  if (title === "To Do") {
    modifier = "background-container--blue";
  } else if (title === "Completed") {
    modifier = "background-container--green";
  } else if (title === "Under Review") {
    modifier = "background-container--purple";
  }

  return (
    <div className={`card-group`}>
      <div className={`background-container ${modifier}`}></div>
      <h2 className="card-group__title">{title}</h2>
      <ul className="list list--task">
        {tasks.map((task) => (
          <li key={task.id} className="task" onClick={() => setOpenTask(task)}>
            <h2 className="task__title">{task.Title}</h2>
            <div className="task__info">
              <div className="task__tags">
                {task.tags.map((tag) => (
                  <span key={tag.Title} className="task__tag">
                    {tag.Title}
                  </span>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
      {openTask && (
        <OpenDialog
          task={openTask}
          onChangeState={() => {}}
          onClose={() => setOpenTask(null)}
        />
      )}
    </div>
  );
}

export default TaskSection;
