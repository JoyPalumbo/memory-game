const Modal = ({ close, show, children }) => {
    const showHideClassName = show ? 'modal display-block' : 'modal display-none';
  
    return (
      <div className={showHideClassName}>
        <section className='modal-main'>
        <h1>woo</h1>
          <button
            onClick={close}
          >
            Close
          </button>
        </section>
      </div>
    );
  };
  export default Modal