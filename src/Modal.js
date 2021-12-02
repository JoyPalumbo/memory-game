const Modal = ({ close, show, moves, score }) => {
    const showHideClassName = show ? 'modal display-block' : 'modal display-none';
  
    return (
      <div className={showHideClassName}>
        <section className='modal-main'>
        <h1>Great Job!</h1>
        <h3>You completed the game in {moves} moves</h3>
        <h3>Your score is: {score}</h3>
          <button className="modal-button"
            onClick={close}
          >
            Close
          </button>
        </section>
      </div>
    );
  };
  export default Modal