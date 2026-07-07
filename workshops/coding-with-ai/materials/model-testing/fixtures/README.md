# Model Testing Fixtures

Fixed inputs for the OpenCode model testing guide, so every model is tested against the same material.

- `message-times.diff` — a real, verified diff that implements the "show message times" practice task. It applies cleanly to the baseline project and its tests pass. Copy it into each disposable workspace for questions B3 and E3 so all models review the same change.

Do not regenerate these files casually. If the baseline project changes, re-apply the diff, fix it, rerun `npm test`, and regenerate it with `git diff`.
