const Modal = ({ close, show, score }) => {
    const showHideClassName = show ? 'modal display-block' : 'modal display-none';
  
    return (
      <div className={showHideClassName}>
        <section className='modal-main'>
        <h1>Great Job!</h1>
        <h3>Your score is: {score}</h3>
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