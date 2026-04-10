# Specification: CEFR Framework Mapping

## Problem

Currently, Azure AI assessment provides raw scores but does not align with CEFR framework. Need to:
1. Map Azure scores to CEFR levels (A1, A2, B1, B2, C1, C2)
2. Generate personalized learning path (lộ trình cá nhân hóa) based on scores
3. Automatically email the learning path to customers

## Goals

1. Create score-to-CEFR mapping algorithm
2. Define learning path templates per level
3. Build automated email delivery system

## End State

- Customer takes AI assessment → Receives email with:
  - Their CEFR level
  - Personalized learning path recommendation
