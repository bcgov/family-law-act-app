---
title: FLA vuex store
---

### vuex store: `application` module

Holds details about the current application.

state:

```javascript
{
  // empty for now, persisted ID from database
  id?: string

  // identifier for the application type
  // I think we only have one for now
  // can be automatically translated to a label
  type: string

  /*
  - pre-populated at the moment, will be persisted for saved applications
  - drives the navigation component
  - entries are updated by their respective Vue components
  - visibility is determined by the initial questionnaire (primarily)
  */
  steps: Step[]

  // update automatically as steps are updated
  lastUpdate: Date

  // updated by navigation or nested component
  // == step type
  currentStep: string

  // updated by navigation or nested component
  // == page key from current step
  currentPage: string

  // update as pages are updated
  allCompleted: boolean

  // might be useful?
  lastPrinted?: Date
}
```

```javascript
class Step {
  // empty for now, persisted ID from database
  id?: string

  // identifier which can be mapped to a known Vue component.
  // can be translated to a label and icon by the navigation component
  type: string

  // combined results from any data entry in this step,
  // including survey results
  result?: object

  // any other data the component needs to persist
  metadata?: object

  // populated by the component responsible for this step type.
  // undefined until that component is loaded for the first time
  pages?: Page[]

  // determined by questionnaire
  // step is hidden in navigation component if false
  active: boolean

  // last time the step was interacted with
  lastUpdate: Date
}
```

```javascript
class Page {
  // value interpreted by the Vue component (usually survey page number)
  // passed in as a prop
  key: string;

  // for showing in the navigation component
  label: string;

  // currently either 0 (not started), 50 (in progress) or 100 (complete)
  // can be rolled up to calculate progress for a Step
  progress: int;
}
```

getters:

- `getStep(stepType): {result?, metadata?}`
  Used by components to load the previous state, if any
  Each component knows its own step type

- `getNavigation()`
  Summarize the steps and pages for rendering by the navigation component

setters:

- `init(type, steps)`
  Called once when the application is first initialized

- `updateCurrentPage(stepType, pageKey)`
  Update `currentStep`, `currentPage`, and `lastUpdate` for the application

- `updateStep(stepType, {result?, pages?, metadata?, active?})`
  Finds the step with the given `type` and sets `result`, `pages`, `metadata`, or `active` if provided.
  Updates `lastUpdate` for that step and the application
  Updates `allCompleted` for the application
