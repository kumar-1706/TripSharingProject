package com.example.tripsharing.TripSharing.service;

import com.example.tripsharing.TripSharing.entity.AutomateExpense;
import com.example.tripsharing.TripSharing.repo.AutoMateExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AutoMateExpenseService {


    @Autowired
    private AutoMateExpenseRepository expenseRepository;

    public boolean addExpense(AutomateExpense expense) {
        try {
            expenseRepository.save(expense);
            return true; // Return true if the expense was successfully added
        } catch (Exception e) {
            e.printStackTrace();
            return false; // Return false if there was an error adding the expense
        }
    }
}