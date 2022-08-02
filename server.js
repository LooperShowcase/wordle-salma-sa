
const express = require("express");

const server = express()

const theAnswer = "bread";
server.get("/guess/:word", (request, response) => {
    const uesrword = request.params.word;
    const arr = [];
    for (let i = 0; i < uesrword.length; i++) {
        const ch = uesrword[i];
        if (ch == theAnswer[i]) {
            arr.push(1);
        } else if (theAnswer.includes(ch)) {
            arr.push(0);
        } else {
            arr.push(-1)
        }

    }
    response.json(arr)

});
server.use(express.static("public"))


server.listen(3000, () => {
    console.log("Server is running on port 3000");
});