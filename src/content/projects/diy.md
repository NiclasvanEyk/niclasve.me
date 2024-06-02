---
title: Diy
description: A modern dependency injection container for Python.
startedAt: 2024-04-07
github: https://github.com/NiclasvanEyk/diy
website: https://diy.niclasve.me
---

I really like the [Laravel Service Container](https://laravel.com/docs/container).
`diy` is my attempt at recreating something in Python.
After working with FastAPI, I notices some shortcomings in their [DI system](https://fastapi.tiangolo.com/tutorial/dependencies).
Other solutions in the Python ecosystem also did not satisfy me.
Most of the issues I had are described in the [guiding principles section](https://diy.niclasve.me/reference/guiding-principles) of `diy`s documentation, though no libraries are explicitly mentioned.

## Quickstart

There are two important parts in `diy`.
`Specification`s contain explicit instructions about how to resolve function parameters, construct types or map protocols/interfaces to a concrete implementation.

```python
import diy

spec = diy.Specification()
```

This is our example class, which only takes one parameter

```python
class ApiClient:
  def __init__(self, token: str):
    self.token = token

  def get(self, url: str):
    # imagine an actual implementation here using the token
```

This teaches our container how to build an `ApiClient`

```python
import os

@spec.builders.decorate
def build_api_client() -> ApiClient:
  return ApiClient(token=os.environ["API_TOKEN"])
```

The container retrieves a spec, and uses the contained instructions to construct types

```python
container = diy.RuntimeContainer(spec)
```

This is how you get an instance

```python
api_client = diy.resolve(ApiClient)
```

You can also call functions by letting their parameters be
resolved from the container

```python
def get_data(api: ApiClient):
  return api.imaginary_method("")
result = diy.call(get_data)
```

## Notes

- focus on good error messages
- dependency visualization
- autowiring
- validation
