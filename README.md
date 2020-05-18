
# My first CRUD with Deno and BWT


### Run API using Deno


> Powershell

```curl -fsSL https://deno.land/x/install/install.sh | sh```


> Start server usin Denox

```deno run --allow-net --allow-write --allow-read --allow-plugin --allow-env --unstable index.ts```


### Run API using Denox
> Powershell

```deno install -Af -n denox https://denopkg.com/BentoumiTech/denox/denox.ts```

> Configure deno-workspace.yml file
```
scripts:
	start:
		file: index.ts
		deno_options:
			allow-net: true
			allow-write: true
			allow-read: true
			allow-plugin: true
			allow-env: true
			unstable: true
```

> Start server using Denox

```denox run start```