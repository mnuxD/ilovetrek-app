import "./_AddComment.scss";

const AddComment = ({ onClick }) => {
  return (
    <div className="button" onClick={onClick}>
      <div className="button__plus">+</div>
      <p className="button__label">Cuéntanos tu experiencia</p>
    </div>
  );
};

export default AddComment;
