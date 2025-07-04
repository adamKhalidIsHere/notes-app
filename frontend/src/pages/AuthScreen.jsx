import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";
import { useNoteStore } from "../stores/useNoteStore";
import { Link } from "react-router-dom";

const AuthScreen = () => {
  const [newNoteActivated, setNewNoteActivated] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { notes, getNotes, createNote } = useNoteStore();

  useEffect(() => {
    getNotes();
  }, []);

  useEffect(() => {
    console.log(notes);
  }, [notes]);

  return (
    <div className="w-[100%] min-h-[calc(100vh-56px)] bg-gray-900 px-5 py-4 text-white  flex flex-wrap gap-2 ">
      <div
        onClick={newNoteActivated ? null : () => setNewNoteActivated(true)}
        className="bg-zinc-300/8 w-56 h-64 rounded-lg hover:bg-zinc-300/11 duration-300 cursor-pointer flex items-center justify-center flex-col"
      >
        {!newNoteActivated && (
          <>
            {" "}
            <CiCirclePlus size={50} />
            <p className="mt-2 text-xl font-semibold">New note</p>
          </>
        )}
        {newNoteActivated && (
          <form
            className="px-4 relative"
            onSubmit={(e) => {
              e.preventDefault();
              createNote({ title, content });
            }}
          >
            <RxCross1
              className="cursor-pointer absolute right-4"
              onClick={() => setNewNoteActivated(false)}
              size={20}
            />
            <input
              type="text"
              className="focus:outline-none border-b-2 border-white select-none"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="resize-none  border-b-2 border-white focus:outline-none mt-4 h-32 w-full scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent"
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <button
              type="submit"
              className="bg-gray-900 w-full rounded-lg py-2 hover:bg-gray-500 duration-300 cursor-pointer"
            >
              New note
            </button>
          </form>
        )}
      </div>
      {notes.map((note) => (
        <Link
          key={note._id}
          to={"/" + note._id}
          className="bg-zinc-300/8 w-56 h-64 rounded-lg hover:bg-zinc-300/11 duration-300 cursor-pointer flex  flex-col py-5 px-4"
        >
          <p className="text-xl mb-5">{note.title}</p>
          <p className="w-[100%] break-words overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent">
            {note.content}
          </p>
        </Link>
      ))}
    </div>
  );
};
export default AuthScreen;
