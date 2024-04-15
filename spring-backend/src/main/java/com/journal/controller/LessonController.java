package com.journal.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.journal.entity.Journal;
import com.journal.entity.Lesson;
import com.journal.service.LessonService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class LessonController {

	private final LessonService lessonService; 
	
	@Autowired
	public LessonController(LessonService lessonService) {
		this.lessonService = lessonService;
	}
	
	@GetMapping("/lessons")
	public List<Lesson> getAllLessons(){
		return lessonService.getAllLessons();
	}
	
	@GetMapping("/lessons/{id}")
	public ResponseEntity<Lesson> getLessonById(@PathVariable Long id) {
		Lesson lesson = lessonService.getLessonById(id);
		return ResponseEntity.ok(lesson);
	}
	
	@PostMapping("/lessons")
	public Lesson createLesson(@RequestBody Lesson lesson) {
		return lessonService.saveLesson(lesson);
	}
	
	@PutMapping("/lessons/{id}")
	public ResponseEntity<Lesson> updateLesson(@PathVariable Long id, @RequestBody Lesson newLesson){
		return ResponseEntity.ok(lessonService.updateLessonById(id, newLesson));
	}
	
	@DeleteMapping("/lessons/{id}")
	public ResponseEntity<Lesson> deleteLesson(@PathVariable Long id){
		lessonService.deleteLessonById(id);
		return ResponseEntity.noContent().build();
	}
	
	
}
