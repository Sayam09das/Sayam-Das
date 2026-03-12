# Theme Animation Fix Progress

## Approved Plan
- Replace Navbar manual theme toggle → AnimatedThemeToggler component
- Remove duplicate logic/storage conflicts
- Ensure ThemeContext Provider wraps app (layout.tsx)
- Test animation/persistence/system sync

## Steps [4/5] ✅
- [x] Create TODO.md
- [x] Edit Navbar.tsx: Import/use AnimatedThemeToggler, remove manual toggle/isDark/MutationObserver
- [x] Check layout.tsx: Confirm `<ThemeProvider>` import/wrap
- [x] Remove sr-only text from AnimatedThemeToggler (icons only)
- [ ] Test locally: `cd client && npm run dev`, toggle theme, verify animation/smoothness/persistence
- [ ] Cleanup: Align storage keys if needed, remove redundant observers in pages (optional)
- [ ] Final verification across pages, attempt_completion

