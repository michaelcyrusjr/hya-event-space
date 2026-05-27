package com.hya.eventspace.events;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/events")
@CrossOrigin
public class EventController {
    private final EventRepository repository;

    public EventController(EventRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Event> getEvents() {
        return repository.findAll();
    }

    @GetMapping("/count")
    public long countEvents() {
        return repository.count();
    }

    @PostMapping
    public Event createEvent(@RequestBody Event event) {
        return repository.save(event);
    }

    @PersistenceContext
    private EntityManager entityManager;

    @GetMapping("/debug-schema")
    public Object debugSchema() {
        return entityManager.createNativeQuery(
                "select sys_context('USERENV','CURRENT_SCHEMA') from dual"
        ).getSingleResult();
    }

    @GetMapping("/native-count")
    public Object nativeCount() {
        return entityManager.createNativeQuery(
                "select count(*) from HYA.EVENT"
        ).getSingleResult();
    }

    @GetMapping("/db-info")
    public Object dbInfo() {
        return entityManager.createNativeQuery("""
        select
            sys_context('USERENV','DB_NAME'),
            sys_context('USERENV','DB_UNIQUE_NAME'),
            sys_context('USERENV','INSTANCE_NAME'),
            sys_context('USERENV','SERVICE_NAME'),
            sys_context('USERENV','SERVER_HOST'),
            sys_context('USERENV','CURRENT_SCHEMA')
        from dual
    """).getSingleResult();
    }

    @GetMapping("/{id}")
    public Event getEvent(@PathVariable Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found"));
    }


}