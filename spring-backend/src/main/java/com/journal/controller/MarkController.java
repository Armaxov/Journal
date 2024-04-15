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
import com.journal.entity.Mark;
import com.journal.service.MarkService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class MarkController {

	private final MarkService markService;
	
	@Autowired
	public MarkController(MarkService markService) {
		this.markService = markService;
	}
	
	@GetMapping("/marks")
	public List<Mark> getAllMarks(){
		return markService.getAllMarks();
	}
	
	@GetMapping("/marks/{id}")
	public ResponseEntity<Mark> getMarkById(@PathVariable Long id) {
		Mark mark = markService.getMarkById(id);
		return ResponseEntity.ok(mark);
	}

	@GetMapping("/marks/journal/{journalId}")
	public ResponseEntity<List<Mark>> getMarksByJournalId(@PathVariable Long journalId) {
		return ResponseEntity.ok(markService.getMarksByJournalId(journalId));
	}
	
	@PostMapping("/marks")
	public Mark createMark(@RequestBody Mark mark) {
		return markService.saveMark(mark);
	}
	
	@PutMapping("/marks/{id}")
	public ResponseEntity<Mark> updateMark(@PathVariable Long id, @RequestBody Mark newMark){
		return ResponseEntity.ok(markService.updateMarkById(id, newMark));
	}
	
	@DeleteMapping("/marks/{id}")
	public ResponseEntity<Mark> deleteMark(@PathVariable Long id){
		markService.deleteMarkById(id);
		return ResponseEntity.noContent().build();
	}
	
	
}
