---
title: "Alternatives To Hierarchical Filesystems"
description: ""
# pubDate: ""
# TODO: Adjust the title
---

The filesystem of your computer most likely is structured hierarchically.
The same holds for the namespaces of many programming languages.
There are multiple levels that can be visualized as a tree.

## An Example

Hierarchies can be useful, especially for files.
Imagine you are building a web shop consisting of a custom content management panel for editors, as well as customer-facing shop for buying products.
For technical reasons, you want to separate the shop and CMS styles.
You come up with the following structure:

```
css/
    shop/
        components/
        pages/
    cms/
        components/
        pages/
```

Fantastic!
Everything is logically separated and clearly named.
Everybody will find stuff quickly.

However, some of your colleagues are fans of DDD and argue to group their files by domain.
They propose the following structure, which would make it easier to break both parts up into separate microservices in the future:

```
shop/
    css/
        components/
        pages/
cms/
    css/
        components/
        pages/
```

Then another colleague argues that the following layout makes more sense, since the components could be developed by a separate design system team, that would have nothing to do with actually implementing the application:

```
components/
    css/
        shop/
        cms/
pages/
    css/
        shop/
        cms/
```

As you can see, there are multiple ways of structuring these files.
There is no clear winner here, though some of the arguments may make more sense to you or for the specific context of the project.

## The Problem

The larger problem illustrated by the previous example is, that the files don't possess any attributes that would allow them to be structured in an obvious hierarchical order.

-----

Another example using integrations and the diamond problem
```
filament/
data-exchange/
filament-data-exchange/
filament-data-exchange-s3/
filament-data-exchange-dropbox/
```

```
Database/
CommandLine/
Debug/
Integration/
    Database/
       SetupCommand.java
       DatabaseDebugExtension.java
```

## Tagging

Instead of

```
css/
    shop/
        components/
            button.css
    cms/
        components/
            button.css
```

you could have

```
button.css #component #css #shop
button.css #component #css #cms
```

Also you may have a `logo.svg` that you want to display both in your CMS _and_ the shop.
After all, branding is important!
Instead of introducing something cursed like a `shared/` folder, you can simply tag the file twice:

```
logo.svg #shop #cms
```

No need to think whether to name the folder `shared/`, `core/`, `common/` or `utils/`.

### Drawbacks

- not supported by current technology
- more flat
- can be annoying to repeat same set of tags (e.g. create lots of CSS files in the shop components directory and always apply all three tags)
