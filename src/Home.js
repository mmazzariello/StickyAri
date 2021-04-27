import Head from "next/head";
import {
  Textarea,
  Box,
  Button,
  IconButton,
  Text,
  Heading,
} from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import * as React from "react";
import {
  HiOutlineTrash,
  HiOutlinePlus,
  HiArrowNarrowRight,
} from "react-icons/hi";
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
    <Box
      height="100%"
      ref={pageConstraintsRef}
      marginX={["5", "5", "5", "20"]}
      marginY={["6", "6", "8", "8"]}
    >
      <Head>
        <title>Sticky Ari</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Text
          fontSize={["xl", "xl", "2xl", "2xl"]}
          color="gray.700"
          fontWeight="semibold"
        >
          StickyAri
        </Text>

        <Box marginX={["2"]} display="flex" alignItems="center">
          {Object.keys(notes).length === 0 ? (
            <>
              <Text
                fontSize={["sm", "sm", "md", "lg"]}
                color="gray.300"
                paddingX={["2", "2", "2", "5"]}
              >
                Create your note here
              </Text>
              <HiArrowNarrowRight />
            </>
          ) : null}

          <Button
            onClick={handleAddNote}
            backgroundColor="orange.200"
            color="white"
            borderRadius="xl"
            marginLeft="8px"
          >
            <HiOutlinePlus />
          </Button>
        </Box>
      </Box>
      <Box marginTop="20px">
        <AllNotes
          pageConstraintsRef={pageConstraintsRef}
          notes={notes}
          onUpdateNote={handleUpdateNote}
          onDelete={handleDeleteNote}
        />
      </Box>
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
        backgroundColor="orange.50"
        boxShadow="lg"
        overflow="hidden"
        minWidth="100px"
        maxWidth={["200px", "200px", "300px", "300px"]}
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
            const newText = e.target.value;
            setText(newText);
            onUpdateNote(note.id, newText);
          }}
        />
        <Box display="flex" justifyContent="flex-end">
          <IconButton
            icon={<HiOutlineTrash />}
            variant="ghost"
            size="sm"
            colorScheme="orange"
            onClick={() => onDelete(note.id)}
          />
        </Box>
      </Box>
    </motion.div>
  );
};
