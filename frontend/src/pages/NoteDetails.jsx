import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useNoteStore } from "../stores/useNoteStore";

const NoteDetails = () => {
  const { noteId } = useParams();
  const { getOneNote, singleNote, updateNote, deleteNote } = useNoteStore();
  const [note, setNote] = useState(singleNote);
  const navigate = useNavigate();

  useEffect(() => {
    getOneNote(noteId);
  }, []);
  useEffect(() => {
    setNote(singleNote);
  }, [singleNote]);

  return (
    <div className="w-[100%] min-h-[calc(100vh-56px)] bg-gray-900 px-5 py-4 text-white">
      <div className="">
        <label htmlFor="title" className="text-2xl font-bold mr-6">
          Title:{" "}
        </label>
        <input
          type="text"
          value={note?.title}
          name="title"
          id="title"
          onChange={(e) => setNote({ ...note, title: e.target.value })}
          className="focus:outline-0 border-b-[1px] border-white h-24 text-2xl w-full"
        />
      </div>
      <div className="mt-14">
        <label htmlFor="content" className="text-2xl font-bold mr-6 ">
          Content:
        </label>
        <textarea
          name="content"
          className="focus:outline-0 w-full border-b-[1px] border-white resize-none h-48 text-2xl "
          id="content"
          onChange={(e) => setNote({ ...note, content: e.target.value })}
          value={note?.content}
        ></textarea>
      </div>
      <button
        onClick={() => {
          updateNote({ noteId, title: note.title, content: note.content });
          navigate("/");
        }}
        className="cursor-pointer rounded-lg border-[1px] hover:bg-white hover:text-black duration-300 px-4 py-2  mr-4 mt-6  "
      >
        Update note
      </button>
      <button
        onClick={() => {
          deleteNote(noteId);
          navigate("/");
        }}
        className="cursor-pointer rounded-lg  px-4 py-2 bg-red-900 hover:bg-red-500 duration-300"
      >
        Delete note
      </button>
    </div>
  );
};
export default NoteDetails;
