package com.journal.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.ResourceAccessException;

import com.journal.entity.Mark;
import com.journal.repository.MarkRepository;

@Service
public class MarkServiceImpl implements MarkService{

	private final MarkRepository markRepository;
	
	@Autowired
	public MarkServiceImpl(MarkRepository markRepository) {
		this.markRepository = markRepository;
	}
	
	@Override
	public List<Mark> getAllMarks() {
		return markRepository.findAll();
	}

	@Override
	public Mark getMarkById(Long id) {
		Mark mark = markRepository.findById(id)
				.orElseThrow(() -> new ResourceAccessException("Mark is not exist with id:" + id));
		return mark;
	}

	@Override
	public List<Mark> getMarksByJournalId(Long journalId) {
		List<Mark> marks = getAllMarks();
		List<Mark> sortedMarks = new ArrayList<>();

		for(Mark mark: marks){
			if(mark.getJournalId() == journalId)
				sortedMarks.add(mark);
		}

		return sortedMarks;
	}

	@Override
	public Mark saveMark(Mark mark) {
		return markRepository.save(mark);
	}

	@Override
	public void deleteMarkById(Long id) {
		Mark mark = getMarkById(id);
		markRepository.delete(mark);
	}

	@Override
	public Mark updateMarkById(Long id, Mark newMark) {
		Mark mark = getMarkById(id);
		mark.changeMarkData(newMark);
		return markRepository.save(mark);
	}

	
}
