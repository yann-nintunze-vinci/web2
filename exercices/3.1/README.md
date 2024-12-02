| URI | Méthode HTTP | Auths? | Opération |
|---|---|---|---|
| **`films`** | GET | Non | READ ALL : Lire toutes les ressources de la collection |
| **`films/:id`** | GET | Non | READ ALL : Lire une ressource de la collection |
| **`films`** | POST | Oui | CREATE ONE : Créer une ressource de la collection basée sur un body au format `{title: string; director: string;  duration: number;  budget?: number;  description?: string;  imageUrl?: string;  }` |
| **`films/:id`** | DELETE | Oui | DELETE ONE : Supprime une ressource de la collection |
| **`films/:id`** | PATCH | Oui | PATCH ONE : Modifie une ressource de la collection |
| **`comments`** | GET | JWT | READ ALL FILTERED : Lire toutes les ressources de la collection |
| **`comments`** | POST | JWT | CREATE ONE : Créer une ressource basée sur un body au format `{author: User; comment: string, film: number}` |
| **`comments/:id`** | DELETE | JWT | DELETE ONE : Supprime une resource de la collection |
| **`comments/:id`** | PATCH | JWT | PATCH ONE : Modifie une ressource de la collection |