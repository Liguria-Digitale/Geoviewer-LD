L.drawLocal = {
  draw: {
    toolbar: {
      actions: {
        title: "Annulla disegno",
        text: "Annulla"
      },
      finish: {
        title: "Termina disegno",
        text: "Termina"
      },
      undo: {
        title: "Cancella ultimo punto",
        text: "Cancella ultimo punto"
      },
      buttons: {
        polyline: "Disegna linea",
        polygon: "Disegna poligono",
        rectangle: "Disegna rettangolo",
        circle: "Disegna cerchio",
        marker: "Disegna punto",
        circlemarker: "Disegna punto"
      }
    },
    handlers: {
      circle: {
        tooltip: {
          start: "Seleziona e trascina per disegnare il cerchio."
        },
        radius: "Radius"
      },
      circlemarker: {
        tooltip: {
          start: "Seleziona la mappa per disegnare il punto."
        }
      },
      marker: {
        tooltip: {
          start: "Seleziona la mappa per disegnare il punto."
        }
      },
      polygon: {
        tooltip: {
          start: "Seleziona per iniziare il disegno del poligono.",
          cont: "Seleziona per continuare il disegno del poligono.",
          end:
            "Seleziona il primo vertice oppure effettua <br>un doppio click per completare il poligono."
        }
      },
      polyline: {
        error: "<strong>Errore:</strong> intersezione non ammessa!",
        tooltip: {
          start: "Seleziona per iniziare il disegno della linea.",
          cont:
            "Seleziona per continuare o doppio click per completare la linea.",
          end:
            "Seleziona per continuare o doppio click per completare la linea."
        }
      },
      rectangle: {
        tooltip: {
          start: "Seleziona e trascina per disegnare il rettangolo."
        }
      },
      simpleshape: {
        tooltip: {
          end: "Rilascia il bottone del mouse per terminare il disegno."
        }
      }
    }
  },
  edit: {
    toolbar: {
      actions: {
        save: {
          title: "Salva i cambiamenti",
          text: "Salva"
        },
        cancel: {
          title: "Annulla modifiche",
          text: "Annulla"
        },
        clearAll: {
          title: "Cancella tutte le geometrie",
          text: "Cancella Tutto"
        }
      },
      buttons: {
        edit: "Modifica Geometrie",
        editDisabled: "Nessuna geometria da modificare",
        remove: "Cancella Geometrie",
        removeDisabled: "Nessuna geometria da cacellare"
      }
    },
    handlers: {
      edit: {
        tooltip: {
          text: "Trascina il punto o i vertici per modificare le geometrie.",
          subtext: 'Seleziona "Annulla" per annulare le modifiche.'
        }
      },
      remove: {
        tooltip: {
          text: "Seleziona una geometria per rimuoverla."
        }
      }
    }
  }
};