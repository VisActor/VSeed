### Selector

```typescript
export type Selector =
  | string
  | number
  | {
      field: string
      operator?: ('=' | '==' | '!=' | '>' | '<' | '>=' | '<=' | 'between') | null
      op?: ('=' | '==' | '!=' | '>' | '<' | '>=' | '<=' | 'between') | null
      value: string | number | (string | number)[]
    }
  | {
      field: string
      operator?: ('in' | 'not in') | null
      op?: ('in' | 'not in') | null
      value: string | number | (string | number)[]
    }
```

### Selectors

```typescript
export type Selectors = (
  | string
  | number
  | {
      field: string
      operator?: ('=' | '==' | '!=' | '>' | '<' | '>=' | '<=' | 'between') | null
      op?: ('=' | '==' | '!=' | '>' | '<' | '>=' | '<=' | 'between') | null
      value: string | number | (string | number)[]
    }
  | {
      field: string
      operator?: ('in' | 'not in') | null
      op?: ('in' | 'not in') | null
      value: string | number | (string | number)[]
    }
)[]
```
