import Task from "../models/task.model.js";

export const getAllTask = async (req, res) => {
  try {
    const Tasks = await Task.find();
    res.json(Tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const Task = await Task.findOne({ _id: req.params.id });
    res.json(Task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createTask = async (req, res) => {
  try {
    console.log(req.body); 
    const nuevaTask = new Task(req.body);
    await nuevaTask.save();

    const token = jwt.sign({ id: nuevaTask._id }, process.env.JWT_TOKEN, {
      expiresIn: "1h", 
    });

    res.json({ message: "¡Registro creado correctamente!", token });
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    await Task.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "¡Registro actualizado correctamente!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "¡Registro eliminado correctamente!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}