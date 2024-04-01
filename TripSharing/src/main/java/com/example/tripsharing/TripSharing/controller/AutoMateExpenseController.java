package com.example.tripsharing.TripSharing.controller;


import com.example.tripsharing.TripSharing.entity.AutomateExpense;
import com.example.tripsharing.TripSharing.service.AutoMateExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
public class AutoMateExpenseController {
    @Autowired
    private AutoMateExpenseService expenseService;

    @PostMapping("/automate-expense")
    public ResponseEntity<String> addExpense(@RequestBody AutomateExpense expense) {

        boolean added = expenseService.addExpense(expense);

        if (added) {
            return ResponseEntity.ok("Expense added successfully");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to add expense. Please try again.");
        }
    }
}
