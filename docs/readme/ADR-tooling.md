## 📄 ADR Tooling Install <a name = "adr_tooling_install"></a>

- Install [ADR-tool](https://github.com/npryce/adr-tools/blob/master/INSTALL.md) to generate and maintain ADRs.

- Use the new command to add a new ADR ( this will auto adding prefix for your ADR eg. `0001-name-of-the-decision`):

```
adr new <name of the decision>
```

- ADR Tools also provides additional functionality to control superceded and obsolete decisions. For more information use:

```
adr help
```