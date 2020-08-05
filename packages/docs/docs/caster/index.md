---
title: Caster
sidebar_label: Introduction
---

import useBaseUrl from '@docusaurus/useBaseUrl'

**Caster is a utility library for transforming and reshaping JSON data.**

It comprises a `cast` function (the default export) and a number of pre-built utility transformation functions that are commonly required when re-shaping JSON data.

<img alt="Etched image of Linotype machine" src={useBaseUrl('img/linotype-machine.jpg')} width="560px" />

## About

APIs are generally multi-purpose data feeds; they will typically be agnostic with respect to the final use of the data being served. This is the case regardless of whether data is accessed via REST, GraphQL, etc. As a result, the data requested from an API usually requires reshaping to conform to the requirements of the end-use or front-end application.

This is the problem **Caster** is designed to solve.

For the purposes of content-driven, statically-generated sites, most, if not all of this overhead can be implemented at build time. For dynamic (React) apps this may need to be implemented client-side, within components or as a request side-effect.

Either way, **Caster** is agnostic and can be used client or server side.

## Principles

Caster is built on the principle of code over configuration.  
There is zero-configuration required, and no DSL to learn.

## Assumptions

**Caster** is designed to fit into a layered application architecture.  
Components should not need to _know_ about incoming data shape.