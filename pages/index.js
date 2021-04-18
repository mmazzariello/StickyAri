import Head from "next/head";
import { Textarea, Box, Button, Input, IconButton } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import * as React from "react";
import { HiOutlineTrash } from "react-icons/hi";

export default function Home() {
  const [notes, setNotes] = React.useState(
    JSON.parse(window.localStorage.getItem("notesEnLS") || "{}")
  );

  const handleAddNote = () => {
    const newNote = { id: uuidv4(), text: "" };
    const updatedListOfNotes = { ...notes, [newNote.id]: newNote };
    setNotes(updatedListOfNotes);
    window.localStorage.setItem(
      "notesEnLS",
      JSON.stringify(updatedListOfNotes)
    );
  };

  const handleUpdateNote = (id, text) => {
    const updatedList = { ...notes, [id]: { id: id, text: text } };
    setNotes(updatedList);
    window.localStorage.setItem("notesEnLS", JSON.stringify(updatedList));
  };

  const handleDeleteNote = (id) => {
    const updatedList = { ...notes };
    delete updatedList[id];
    setNotes(updatedList);
    window.localStorage.setItem("notesEnLS", JSON.stringify(updatedList));
  };

  // let notes {
  //   "123": {
  //     id: "123",
  //     text: "Hola"
  //   },
  //   "333": {
  //     id: "333",
  //     text: "nota 2"
  //   }
  // }

  // const handleDelete = (title) => {
  //   const newPosts = posts.filter((item) => item.title !== title);
  //   setPosts(newPosts);
  //   window.localStorage.setItem("postsEnLS", JSON.stringify(newPosts));
  // };

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Box>
          <Button onClick={handleAddNote}>+</Button>
        </Box>
        <AllNotes
          notes={notes}
          onUpdateNote={handleUpdateNote}
          onDelete={handleDeleteNote}
        />
      </main>
    </div>
  );
}

const AllNotes = ({ notes, onUpdateNote, onDelete }) => {
  return (
    <Box display="flex">
      {Object.values(notes).map((note) => {
        console.log(note.id);
        return (
          <Note
            key={note.id}
            note={note}
            onUpdateNote={onUpdateNote}
            onDelete={onDelete}
          />
        );
      })}
    </Box>
  );
};

const Note = ({ note, onUpdateNote, onDelete }) => {
  // const [initialText, setInitialText] = React.useState(note.text);
  const [text, setText] = React.useState(note.text);

  return (
    <Box boxShadow="md" minWidth="100px" minHeight="100px" padding="4px">
      <Textarea
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          onUpdateNote(note.id, text);
        }}
      />
      <IconButton
        icon={<HiOutlineTrash />}
        variant="ghost"
        size="sm"
        colorScheme="red"
        onClick={() => onDelete(note.id)}
      />
    </Box>
  );
};

const AllPosts = ({ onDelete, onEdit }) => {
  const posts = JSON.parse(window.localStorage.getItem("postsEnLS") || "[]");

  return (
    <Box>
      {posts.map((post, index) => {
        return (
          <Box key={index}>
            {post.title}
            {post.content}

            <Button onClick={() => onDelete(post.title)}>Delete</Button>
          </Box>
        );
      })}
    </Box>
  );
};

const EditPost = ({ onEdit }) => {};
