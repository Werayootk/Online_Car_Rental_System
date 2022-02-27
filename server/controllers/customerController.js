
exports.getCustomerAll = async (req, res, next) => {
    try {
        res.status(200).json({
            message: "get all customer"
        })
    } catch (err) {
        next(err);
    };
};