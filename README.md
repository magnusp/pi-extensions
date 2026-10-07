# Pi Extensions

Installable packages for the [Pi coding agent](https://pi.dev), published under `@magnusp` and based on [original work](https://github.com/zenspc/pi-extensions) by `@zenspc`.

> **Scope:** this monorepo publishes only [`@magnusp/pi-quiet`](./packages/pi-quiet) and [`@magnusp/pi-pstack`](./packages/pi-pstack). See [Removed packages](#removed-packages) for the eight that are no longer part of it.

## Packages

| Package | Install | What you get |
|---|---|---|
| [`@magnusp/pi-quiet`](./packages/pi-quiet) | `pi install npm:@magnusp/pi-quiet` | Quiet Display - dense built-in tool rows |
| [`@magnusp/pi-pstack`](./packages/pi-pstack) | `pi install npm:@magnusp/pi-pstack` | pstack skills + subagents: poteto-mode playbooks, engineering principles, multi-model review panels |

Pre-1.0 APIs may change.

## Removed packages

These were removed from this repository before anything was published from it under the `@magnusp`
scope, so there is no version to install and nothing to deprecate. They are listed for provenance and
to explain why the repo is smaller than the fork this descends from.

| Package | Why it went away |
|---|---|
| `@magnusp/pi-safety` | Confirmation heuristic for destructive commands; never a security boundary. |
| `@magnusp/pi-workflow` | Plan mode was a workflow aid, not an enforcement layer. |
| `@magnusp/pi-browser` | Drove a dedicated Chrome; `browser_evaluate` ran arbitrary page JavaScript against approved origins. |
| `@magnusp/pi-devtools` | Context dumps can contain secrets, tokens, and PII. |
| `@magnusp/pi-preferred-thinking` | Superseded by Pi itself. |
| `@magnusp/pi-copilot-discovery` | Superseded by Pi itself. |
| `@magnusp/pi-spinner` | Local TUI chrome only; low value, non-trivial surface. |
| `@magnusp/pi-sticky-editor` | Superseded by Pi itself. |

## Security notes

- **pi-quiet**: presentation-only override of built-in tool rendering. Config is untrusted input (size caps, symlink refusal). Does not change tool execution.
- **pi-pstack**: markdown skills and agent definitions only. No executable extension code; bundled scripts run under bun when a playbook calls them. Skills instruct the model to spawn subagents and run project commands; review before installing.

See each package README and [SECURITY.md](./SECURITY.md) for details.

## Local development

```bash
pnpm check

# try one package without publishing
pi -e ./packages/pi-quiet
pi -e ./packages/pi-pstack

# install from path into user settings
pi install ./packages/pi-quiet
pi install ./packages/pi-pstack
```

## Pick pieces from a package

Example: install only the pstack extension, without the bundled skills and subagents.

```json
{
  "packages": [
    {
      "source": "npm:@magnusp/pi-pstack",
      "extensions": ["extensions/pstack/index.ts"]
    }
  ]
}
```

Use `pi config` to enable or disable individual resources after install.

## Not included

Other local-only packages are intentionally not published from this monorepo.

## Docs

- [Contributing](./CONTRIBUTING.md) ([detailed guide](./docs/contributing.md))
- [Security](./SECURITY.md)
- [Code of Conduct](./CODE_OF_CONDUCT.md)
- [Publishing / release model](./docs/publishing.md) (changesets → Version PR → tags → npm + GitHub Release)

## License

MIT
