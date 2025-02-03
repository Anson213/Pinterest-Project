


const uploadData = (req, res) => {
    const newItem = req.body;

    // Here you would typically add code to save the newItem to a database
    // For now, we'll just return the newItem as a response

    res.status(201).json({
        message: 'Item created successfully',
        data: newItem
    });
};

module.exports = {
    createItem
};