// /C:/Users/HP/OneDrive/Desktop/Pinterest/backend/controllers/test-controllers.js

const getTest = (req, res) => {
    res.status(200).json({ message: "GET request successful" });
};

const postTest = (req, res) => {
    const data = req.body;
    res.status(201).json({ message: "POST request successful", data });
};

const putTest = (req, res) => {
    const data = req.body;
    res.status(200).json({ message: "PUT request successful", data });
};

const deleteTest = (req, res) => {
    res.status(200).json({ message: "DELETE request successful" });
};

module.exports = {
    getTest,
    postTest,
    putTest,
    deleteTest
};