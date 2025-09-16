package com.todo.backend.model;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // store the task text
    @Column(nullable = false)
    private String name;

    // optional: add completed flag
    private boolean completed = false;

    public Task() {}

    public Task(String name) {
        this.name = name;
    }

//    // getters and setters
//    public Long getId() { return id; }
//    public void setId(Long id) { this.id = id; }
//
//    public String getName() { return name; }
//    public void setName(String name) { this.name = name; }
//
//    public boolean isCompleted() { return completed; }
//    public void setCompleted(boolean completed) { this.completed = completed; }
}
