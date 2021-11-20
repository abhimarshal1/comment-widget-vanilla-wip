let comments = {};

let parent;

let nextCommentId = 1;

let btnTarget;

const addComment = () => {
  const text = document.getElementById("comment-input").value;

  comments = {
    ...comments,
    [nextCommentId]: {
      text,
      likes: 0,
    },
  };

  addCommentToUI(text);
  clearInput();
  disableCommentbox();
};

const updateLikes = (e) => {
  const id = e.target.id.split("-")[1];
  const newCountLikes = comments[id].likes + 1;
  comments = {
    ...comments,
    [id]: {
      text: comments[id].text,
      likes: newCountLikes,
    },
  };
  const el = document.getElementById(e.target.id);
  el.innerText = `Likes: ${comments[id].likes}`;
};

const addCommentToUI = (text) => {
  const div = document.createElement("DIV");
  const replyBtn = document.createElement("BUTTON");
  const textNode = document.createElement("P");
  const likes = document.createElement("SPAN");
  textNode.innerText = `--${text}`;
  textNode.class = "i-comment";
  likes.innerText = "Likes: 0";
  likes.id = `spanLike-${nextCommentId}`;
  likes.onclick = updateLikes;
  replyBtn.innerText = "Reply";
  replyBtn.onclick = enableCommentbox;
  replyBtn.id = `btnComment-${nextCommentId}`;
  div.className = "i-comment";
  div.id = `divComment-${nextCommentId}`;
  div.appendChild(textNode);
  div.appendChild(likes);
  div.appendChild(replyBtn);

  nextCommentId++;

  parent.appendChild(div);
};

const enableCommentbox = (e) => {
  btnTarget = e.target.id;

  const isPostTarget = e.target.id === "btnComment";
  const target = isPostTarget
    ? "comments"
    : `divComment-${e.target.id.split("-")[1]}`;

  parent = document.getElementById(target);
  document.getElementById("comment-box").hidden = false;
  document.getElementById(btnTarget).hidden = true;
};

const disableCommentbox = () => {
  document.getElementById(btnTarget).hidden = false;
  document.getElementById("comment-box").hidden = true;
};

const clearInput = () => {
  document.getElementById("comment-input").value = "";
};

document.getElementById("comment-btn").addEventListener("click", addComment);
document
  .getElementById("cancel-btn")
  .addEventListener("click", disableCommentbox);
document
  .getElementById("btnComment")
  .addEventListener("click", enableCommentbox);
