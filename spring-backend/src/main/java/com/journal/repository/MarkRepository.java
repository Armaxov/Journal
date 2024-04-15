package com.journal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.journal.entity.Mark;

@Repository
public interface MarkRepository extends JpaRepository<Mark, Long>{

}
