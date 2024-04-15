package com.journal.service;

import java.util.List;

import com.journal.entity.Mark;

public interface MarkService {
	
	List<Mark> getAllMarks();
	
	Mark getMarkById(Long id);

	List<Mark> getMarksByJournalId(Long journalId);
	
	Mark saveMark(Mark Mark);
	
	void deleteMarkById(Long id);
	
	Mark updateMarkById(Long id, Mark newMark);
	
}
