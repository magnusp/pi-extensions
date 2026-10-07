# Security Policy

## Supported versions

This monorepo is pre-1.0 and now publishes only two packages.

Security fixes are applied only to the **latest published version** of each package:

- `@magnusp/pi-quiet`
- `@magnusp/pi-pstack`

Older published versions are not maintained with backports unless a release note says otherwise.

## Unsupported packages

The following packages were removed from this repository and are **out of scope for security reports**:

- `@magnusp/pi-safety`
- `@magnusp/pi-workflow`
- `@magnusp/pi-browser`
- `@magnusp/pi-devtools`
- `@magnusp/pi-preferred-thinking`
- `@magnusp/pi-copilot-discovery`
- `@magnusp/pi-spinner`
- `@magnusp/pi-sticky-editor`

None of them were published from this repository under the `@magnusp` scope, so there is no published
version to report against and nothing to deprecate. For the ones Pi now ships itself, use Pi's
built-in equivalent.

## Reporting a vulnerability

Please report security issues **privately**. Do not open a public GitHub issue for vulnerabilities, secrets, or token leaks.

Preferred:

1. Use [GitHub Private Vulnerability Reporting](https://github.com/magnusp/pi-extensions/security/advisories/new) when it is enabled for this repository.
2. Otherwise contact the maintainers privately via GitHub: [@dhairyaar](https://github.com/dhairyaar).

Include:

- Affected package name and version
- Impact summary
- Reproduction steps or proof of concept (keep it minimal)
- Whether the issue is already public

We will acknowledge private reports as soon as practical and coordinate disclosure.

## What is out of scope

Some debug surfaces intentionally expose local session or environment data.
That is not treated as a vulnerability by itself.

Bugs that allow **unintended** secret exfiltration (for example, leaking credentials into logs without the user requesting a dump) are in scope and should be reported privately.

Note that `@magnusp/pi-pstack` bundles skills that instruct the model to spawn subagents and run project commands, and its playbook scripts shell out to `git`, `gh`, and `gt`. Model-directed execution of those commands is the documented design of the package, not a vulnerability; what matters is that the model is not steered into doing so by untrusted input. Report the latter.

## Bad published versions

If a published package version is broken or unsafe, ship a fixed version immediately.
Unpublish is limited by npm policy after a short window.
Deprecate the bad version with `npm deprecate @magnusp/<pkg>@<ver> "reason; use @magnusp/<pkg>@X.Y.Z"`.
If a tarball leaked tokens or secrets, rotate credentials and report via the private channel above.

## Non-vulnerabilities

The following are expected product behavior, not security bugs:

- Model-directed execution of commands described by a `pi-pstack` skill or playbook
- `@magnusp/pi-quiet` replacing the rendering of built-in tool rows; it does not alter tool execution
- Session or transcript content appearing in pi's own UI or logs
