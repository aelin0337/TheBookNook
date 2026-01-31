import Order from "../models/Order.js";
import Book from "../models/Book.js"; 

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id.toString() });

    // Для каждого заказа заменяем bookId на данные книги
    const ordersWithDetails = await Promise.all(
      orders.map(async order => {
        const detailedItems = await Promise.all(
          order.items.map(async item => {
            const book = await Book.findById(item.bookId).select('title author price');
            return {
              ...item.toObject(),
              title: book?.title || "Неизвестная книга",
              author: book?.author || "Неизвестный автор"
            };
          })
        );

        return {
          ...order.toObject(),
          items: detailedItems
        };
      })
    );

    res.json(ordersWithDetails);
  } catch (error) {
    res.status(500).json({
      message: "Ошибка при получении ваших заказов",
      error: error.message,
    });
  }
};

// Получить все заказы
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Ошибка при получении заказов",
      error: error.message,
    });
  }
};

// Получить заказ по ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Заказ не найден" });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({
      message: "Ошибка при получении заказа",
      error: error.message,
    });
  }
};
export const createOrder = async (req, res) => {
  try {
    console.log('CREATE ORDER BODY:', req.body);
    console.log('USER:', req.user);

    for (const item of req.body.items) {
      if (!mongoose.Types.ObjectId.isValid(item.bookId)) {
        return res.status(400).json({
          message: "Неверный bookId",
          bookId: item.bookId
        });
      }
    }

    const order = new Order({
      userId: req.user._id,
      items: req.body.items,
      totalAmount: req.body.totalAmount,
      status: "pending",
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    console.error('CREATE ORDER ERROR:', error);
    res.status(500).json({ 
      message: "Ошибка при создании заказа",
      error: error.message
    });
  }
};

// PUT /orders/:id
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        message: "Статус обязателен",
      });
    }

    const order = await Order.findOne({ _id: req.params.id });
    if (!order) {
      return res.status(404).json({
        message: "Заказ не найден",
      });
    }

    order.status = status;
    await order.save();

    res.json({
      message: "Статус заказа обновлён",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: "Ошибка при обновлении статуса заказа",
      error: error.message,
    });
  }
};
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Заказ не найден",
      });
    }

    res.json({
      message: "Заказ удалён",
      orderId: order._id,
    });
  } catch (error) {
    res.status(500).json({
      message: "Ошибка при удалении заказа",
      error: error.message,
    });
  }
};