import Head from "next/head";
import { Textarea, Box, Button, Input, IconButton } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import * as React from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { motion } from "framer-motion";
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
  const handleUpdateNote = (id, text, position) => {
    const updatedNote = { ...notes[id] };
    if (text) updatedNote.text = text;
    if (position) updatedNote.position = position;
    const updatedList = { ...notes, [id]: updatedNote };
    setNotes(updatedList);
    window.localStorage.setItem("notesEnLS", JSON.stringify(updatedList));
  };
  const handleDeleteNote = (id) => {
    const updatedList = { ...notes };
    delete updatedList[id];
    setNotes(updatedList);
    window.localStorage.setItem("notesEnLS", JSON.stringify(updatedList));
  };
  const pageConstraintsRef = React.useRef();
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
  return (
    <Box height="100%" ref={pageConstraintsRef}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box>
        <Button onClick={handleAddNote}>+</Button>
      </Box>
      <AllNotes
        pageConstraintsRef={pageConstraintsRef}
        notes={notes}
        onUpdateNote={handleUpdateNote}
        onDelete={handleDeleteNote}
      />
    </Box>
  );
}
const AllNotes = ({ notes, onUpdateNote, onDelete, pageConstraintsRef }) => {
  return (
    <Box position="relative" height="100%">
      {Object.values(notes).map((note) => {
        return (
          <Note
            pageConstraintsRef={pageConstraintsRef}
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
const Note = ({ note, onUpdateNote, onDelete, pageConstraintsRef }) => {
  // const [initialText, setInitialText] = React.useState(note.text);
  const [text, setText] = React.useState(note.text);
  return (
    <motion.div
      onDragEnd={(event, info) => {
        onUpdateNote(note.id, text, {
          x: event.target.getBoundingClientRect().left,
          y: event.target.getBoundingClientRect().top,
        });
      }}
      drag
      dragConstraints={pageConstraintsRef}
      dragMomentum={false}
      whileDrag={{ zIndex: 1, scale: 1.1, rotate: "5deg" }}
      style={{
        position: "absolute",
        x: note.position ? note.position.x : 0,
        y: note.position ? note.position.y : 0,
      }}
    >
      <Box
        backgroundColor="white"
        boxShadow="lg"
        overflow="hidden"
        minWidth="100px"
        minHeight="100px"
        borderRadius="md"
        padding="4"
        paddingTop="8"
      >
        <Textarea
          value={text}
          _hover={{ boxShadow: "none" }}
          _focus={{ boxShadow: "none" }}
          border="none"
          resize="none"
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
    </motion.div>
  );
};
