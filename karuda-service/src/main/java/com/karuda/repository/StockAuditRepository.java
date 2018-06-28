package com.karuda.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.karuda.domain.StockAudit;

public interface StockAuditRepository extends JpaRepository<StockAudit, Long> {

}
