package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"net/http"
	"strconv"

	_ "github.com/go-sql-driver/mysql"
)

var db, err = sql.Open("mysql", "DionisiyG:3721600@Den@/reactGalleryDb")

// Item : single item
type Item struct {
	Id          int
	Description string
	Src         string
	Lft         int
	Rgt         int
}

// ItemList : slice of Items
type ItemList struct {
	ItemList []Item
}

func main() {
	status := "working"
	fmt.Println("I am", status)
	http.HandleFunc("/getAll", getAll)
	http.HandleFunc("/addItem", addItem)
	http.HandleFunc("/deleteItem", deleteItem)
	http.ListenAndServe(":3001", nil)
}

var items ItemList

// Endpoints
func getAll(w http.ResponseWriter, r *http.Request) {
	if r.Method != "GET" {
		http.Error(w, http.StatusText(405), 405)
		return
	}

	_items := getAllItems()
	//makeTree(_items)

	b, err := json.Marshal(_items)
	checkErr(err)

	enableCors(&w)
	w.Write(b)
}

// func makeTree(items ItemList, lft , rgt ) ItemList{

// 	for  i := range items.ItemList{
// 		//item := itemms.ItemList[i]
// 		if items.ItemList[i].Lft + 1 < items.ItemList[i].Rgt{
// 			items.ItemList[i].Children =  append(items.ItemList[i].Children, items.ItemList[i].Id)
// 		}	
// 	}
// 	var array []ItemList
// 	for i := range items.ItemList{
// 		if
// 	}

// 	fmt.Println(items) 
// 	return items
// }

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
	var items = getAllItems()
	updateKeys(items)
	w.WriteHeader(http.StatusCreated)
}

func deleteItem(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	// Get the URL `?id=X` parameter
	nId := r.URL.Query().Get("id")

	// Transform string nId to int nIdInt
	nIdInt, _ := strconv.Atoi(nId)

	items := getAllItems()

	var itemtoDel = findItemToDelete(nIdInt)
	var rgtToDel = itemtoDel.Rgt
	var lftToDel = itemtoDel.Lft

	for _, item := range items.ItemList {
		if itemtoDel.Id == 0 {
			break
		}
		if item.Lft == lftToDel && item.Rgt == rgtToDel {
			//fmt.Println("This is item to delete", item)
			_, errSib := db.Exec("DELETE FROM new_table WHERE lft >= ? AND rgt <= ?", itemtoDel.Lft, itemtoDel.Rgt)
			checkErr(errSib)
			_, err := db.Exec("DELETE FROM new_table WHERE id=?", item.Id)
			checkErr(err)

		}
		if rgtToDel < item.Rgt {
			db.Exec("UPDATE new_table SET rgt = rgt - (? - ? + 1) WHERE id = ?", rgtToDel, lftToDel, item.Id)
		}
		if rgtToDel < item.Lft {
			db.Exec("UPDATE new_table SET lft = lft - (? - ? + 1) WHERE id = ?", rgtToDel, lftToDel, item.Id)
		}
	}

	//fmt.Println("to delete", itemtoDel)
	//_, err := db.Exec("DELETE FROM new_table WHERE id=?", nId)
	//checkErr(err)

	//fmt.Fprintf(w, "Item %s deleted. \n", nId)
}

// Support functions
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



func getAllItems() ItemList {
	rows, err := db.Query("SELECT * FROM new_table ORDER BY id")
	checkErr(err)
	defer rows.Close()

	var items ItemList

	for rows.Next() {
		var id int
		var description string
		var src string
		var lft int
		var rgt int

		err = rows.Scan(&id, &description, &src, &lft, &rgt)

		items.ItemList = append(items.ItemList, Item{Id: id, Description: description, Src: src, Lft: lft, Rgt: rgt})
	}


	
	return items
}

func updateKeys(items ItemList) ItemList {
	var lastItem = items.ItemList[len(items.ItemList)-1]
	var lastItemLKey = lastItem.Lft
	var lastItemRKey = lastItem.Rgt
	//fmt.Println("Last item of a slice is:", lastItem, "Lkey is", lastItemLKey, "Rkey is", lastItemRKey)

	if len(items.ItemList) > 1 {
		for _, item := range items.ItemList {
			if item.Lft == lastItemLKey && item.Rgt == lastItemRKey {
				//fmt.Println("This is added item")
				break
			}
			if item.Lft >= lastItemLKey {
				db.Exec("UPDATE new_table SET lft = lft + 2 WHERE id = ?", item.Id)
			}
			if item.Rgt >= lastItemLKey {
				db.Exec("UPDATE new_table SET rgt = rgt + 2 WHERE id = ?", item.Id)
			}
		}
	}
	return items
}

// RepoCreateItem : supportive func to add newly added item to slice ItemList
func RepoCreateItem(item Item) Item {
	items.ItemList = append(items.ItemList, item)
	return item
}

func findItemToDelete(id int) Item {
	items := getAllItems()
	var itemToDelete Item
	for _, item := range items.ItemList {
		if item.Id == id {
			//fmt.Println("to delete", item)
			itemToDelete = item
		}
	}
	//fmt.Println("to delete", itemToDelete)
	return itemToDelete
}
