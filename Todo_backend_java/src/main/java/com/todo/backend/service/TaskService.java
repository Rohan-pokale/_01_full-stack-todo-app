package com.todo.backend.service;

import com.todo.backend.exception.ResourceNotFoundException;
import lombok.Data;
import com.todo.backend.model.Task;
import com.todo.backend.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Data
public class TaskService {

    private final TaskRepository repo;

    //adding task
    public Task create(Task t) {
        return repo.save(t);
    }

    //updating task
    public Task update(Long id, Task updated) {
        Task existing = repo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with id: " + id));
        existing.setName(updated.getName());
        existing.setCompleted(updated.isCompleted());
        return repo.save(existing);
    }

    //delete task
    public void delete(Long id) {
        if (!repo.existsById(id)) {
            throw new ResourceNotFoundException("Task not found with id: " + id);
        }
        repo.deleteById(id);
    }

    //get all
    public List<Task> getAll() {
        return repo.findAll();
    }
}
