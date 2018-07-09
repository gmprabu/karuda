package com.karuda.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.karuda.domain.Price;

public interface PriceRepository  extends JpaRepository<Price, Long> {

}
