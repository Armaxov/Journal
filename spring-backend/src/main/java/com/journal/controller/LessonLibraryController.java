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

import com.journal.entity.LessonLibrary;
import com.journal.service.LessonLibraryService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class LessonLibraryController {

	private final LessonLibraryService lessonLibraryService;
	
	@Autowired
	public LessonLibraryController(LessonLibraryService lessonLibraryService) {
		this.lessonLibraryService = lessonLibraryService;
	}
	
	@GetMapping("/lessonLibraries/")
	List<LessonLibrary> getLessonLibraries(){
		return lessonLibraryService.getLessonLibraries();
	}
	
	@GetMapping("/lessonLibraries/{id}")
	ResponseEntity<LessonLibrary> getLessonLibraryById(@PathVariable Long id){
		LessonLibrary lessonLibrary = lessonLibraryService.getLessonLibraryById(id);
		return ResponseEntity.ok(lessonLibrary);
	}
	
	@GetMapping("/lessonLibraries/byUser/{userId}")
	List<LessonLibrary> getLessonLibraryByUserId(@PathVariable Long userId){
		return lessonLibraryService.getLessonLibrariesByUserId(userId);
	}
	
	@PostMapping("/lessonLibraries")
	public LessonLibrary saveLessonLibrary(@RequestBody LessonLibrary lessonLibrary) {
		return lessonLibraryService.saveLessonLibrary(lessonLibrary);
	}
	
	@PutMapping("/lessonLibraries/{id}")
	public ResponseEntity<LessonLibrary> updateLessonLibrary(@PathVariable Long id, @RequestBody LessonLibrary lessonLibrary){
		return ResponseEntity.ok(lessonLibraryService.updateLessonLibraryById(id, lessonLibrary));
	}
	
	@DeleteMapping("/lessonLibraries/{id}")
	public ResponseEntity<LessonLibrary> deleteLesson(@PathVariable Long id){
		lessonLibraryService.deleteLessonLibrary(id);
		return ResponseEntity.noContent().build();
	}
}
