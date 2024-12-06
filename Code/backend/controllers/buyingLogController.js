import BuyingLog from "../models/buyingLogModel.js";

export const createBuyingLog = async (req, res) => {
  try {
    const { userId, quantity, combo, totalAmount } = req.body;

    const log = new BuyingLog({ userId, quantity, combo, totalAmount });
    await log.save();

    res.status(201).json(log);
  } catch (error) {
    res.status(500).json({ error: "Failed to create buying log" });
  }
};

export const getBuyingLogsByUser = async (req, res) => {
  try {
    const logs = await BuyingLog.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch buying logs" });
  }
};
