package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
	// "log"
	// "io"
	// "io/ioutil"
)

var db, err = sql.Open("mysql", "DionisiyG:3721600@Den@/reactGalleryDb")

type Item struct {
	Id          int
	Description string
	Src         string
	Lft         int
	Rgt         int
}

type ItemList struct {
	ItemList []Item
}

func main() {
	name := "working"
	fmt.Println("I am", name)
	http.HandleFunc("/getAll", getAll)
	http.HandleFunc("/addItem", addItem)
	http.HandleFunc("/deleteItem", deleteItem)
	http.ListenAndServe(":3001", nil)
}

func checkErr(err error) {
	if err != nil {
		panic(err)
	}
}

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "*")
	(*w).Header().Set("Content-Type", "application/json")
}

func getAll(w http.ResponseWriter, r *http.Request) {
	if r.Method != "GET" {
		http.Error(w, http.StatusText(405), 405)
		return
	}

	rows, err := db.Query("SELECT * FROM new_table ORDER BY id")
	if err != nil {
		http.Error(w, http.StatusText(500), 500)
		return
	}
	defer rows.Close()

	var items ItemList

	for rows.Next() {
		var id int
		var description string
		var src string
		var lft int
		var rgt int

		err = rows.Scan(&id, &description, &src, &lft, &rgt)
		if err != nil {
			http.Error(w, http.StatusText(500), 500)
			return
		}

		items.ItemList = append(items.ItemList, Item{Id: id, Description: description, Src: src, Lft: lft, Rgt: rgt})
	}

	b, err := json.Marshal(items)
	checkErr(err)

	enableCors(&w)
	w.Write(b)
}

var items ItemList

//
func RepoCreateItem(item Item) Item {
	//db.Exec("UPDATE new_table SET rgt = rgt + 2, lft = IF(lft > $rgt, lft + 2, lft) WHERE rgt >= $rgt")
	items.ItemList = append(items.ItemList, item)
	return item
}

func addItem(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)

	var item Item

	body, err := ioutil.ReadAll(io.LimitReader(r.Body, 1048576))
	if err != nil {
		panic(err)
	}
	if err := r.Body.Close(); err != nil {
		panic(err)
	}

	if err := json.Unmarshal(body, &item); err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(422) // unprocessable entity
		if err := json.NewEncoder(w).Encode(err); err != nil {
			panic(err)
		}
	}

	item = RepoCreateItem(item)
	db.Exec("INSERT INTO new_table (description, src, lft, rgt) VALUES( ?, ?, ?, ?)", item.Description, item.Src, item.Lft, item.Rgt)
	if err != nil {
		http.Error(w, http.StatusText(500), 500)
		return
	}

	w.WriteHeader(http.StatusCreated)
}

func deleteItem(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	// Get the URL `?id=X` parameter
	nId := r.URL.Query().Get("id")

	_, err := db.Exec("DELETE FROM new_table WHERE id=?", nId)
	checkErr(err)

	fmt.Fprintf(w, "Item %s deleted. \n", nId)
}
