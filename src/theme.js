import { extendTheme } from "@chakra-ui/react";
// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
  styles: {
    global: {
      html: {
        height: "100%",
      },
      body: {
        backgroundColor: "white",
        height: "100%",
        minHeight: "100%",
      },
      "#__next": {
        height: "100%",
      },
    },
  },
});
export { theme };
