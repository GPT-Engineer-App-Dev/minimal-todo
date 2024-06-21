import React, { useState } from 'react';
import { Box, Button, Input, List, ListItem, IconButton, Flex, Text } from '@chakra-ui/react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [editingText, setEditingText] = useState('');

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: newTask }]);
      setNewTask('');
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const startEditing = (task) => {
    setEditingTask(task.id);
    setEditingText(task.text);
  };

  const saveTask = (id) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, text: editingText } : task)));
    setEditingTask(null);
    setEditingText('');
  };

  return (
    <Box p={4} maxW="md" mx="auto">
      <Text fontSize="2xl" mb={4}>Todo App</Text>
      <Flex mb={4}>
        <Input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          mr={2}
        />
        <Button onClick={addTask} colorScheme="teal">Add Task</Button>
      </Flex>
      <List spacing={3}>
        {tasks.map(task => (
          <ListItem key={task.id} display="flex" alignItems="center">
            {editingTask === task.id ? (
              <Flex flex="1" alignItems="center">
                <Input
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  mr={2}
                />
                <Button onClick={() => saveTask(task.id)} colorScheme="teal" mr={2}>Save</Button>
                <Button onClick={() => setEditingTask(null)}>Cancel</Button>
              </Flex>
            ) : (
              <Flex flex="1" alignItems="center">
                <Text flex="1">{task.text}</Text>
                <IconButton
                  icon={<FaEdit />}
                  onClick={() => startEditing(task)}
                  mr={2}
                />
                <IconButton
                  icon={<FaTrash />}
                  onClick={() => deleteTask(task.id)}
                />
              </Flex>
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Index;