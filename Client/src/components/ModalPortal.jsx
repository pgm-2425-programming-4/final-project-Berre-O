import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

function ModalPortal({ children }) {
  const [container, setContainer] = useState(null);

  useEffect(() => {
    const modalRoot = document.getElementById("modal-root");
    setContainer(modalRoot);
  }, []);

  if (!container) return null;

  return createPortal(children, container);
}

export default ModalPortal;