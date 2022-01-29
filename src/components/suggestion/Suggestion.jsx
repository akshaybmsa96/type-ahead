import "./style.css";
const TypeAheadSuggestion = ({
  title,
  imgSrc = "https://www.w3schools.com/howto/img_avatar.png",
}) => {
  return (
    <div className="suggestion">
      <img loading="lazy" alt="avatar" src={imgSrc} />
      <span>{title}</span>
    </div>
  );
};

export default TypeAheadSuggestion;
