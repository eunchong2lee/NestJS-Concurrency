# NestJS-Concurrency

`1. 동시성 테스트를 위해서 간단한 가상 온라인 예약 시스템 API 구현
`


`2. 트랜잭션 이상현상 Dirty-read, non-repeatable-read, phantom-read 직접 구현 및 transaction isolation level 적용 후 결과 비교
`

sample 예약 시스템이고 수량이 부족할 경우 자동적으로 다른 사람은 예약이 안되어야 하기 때문에
ISOLATION LEVEL은 SERIALIZABLE로 설정

데이터 동시성 제어를 위해서 LOCK을 사용
LOCK은 비관적 락을 사용하였고 그 중에 pessimistic_write 사용
pessimistic_write 같은 경우 트랜잭션이 읽은 데이터를 해당 트랜잭션이 종료될 때까지 다른 트랜잭션이 읽기, 쓰기, 수정하는 것을 방지하며 접근하지 못하도록 하기 때문에 사용



## Flow Chart
red line is Drity-Read
blue line is Non-Repeatable-Read
black line is Phantom-Read

<img width="751" alt="스크린샷 2024-03-25 오후 8 06 14" src="https://github.com/eunchong2lee/NestJS-Concurrency/assets/104499306/ab369edf-fdaf-4f24-a01a-5d05ffd7f241">


### run
`
yarn install
`

`
yarn run start
`


## Run API & Compare Result

### Before run every API


/mocks/initialize


### Dirty Read
/transactions/phenomena/dirty-read

/transactions/isolation-level/read-uncommitted

/transactions/isolation-level/read-committed

### Non Repeatable Read
/transactions/phenomena/non-repeatable-read

/transactions/isolation-level/repeatable-read


### Phantom-Read
/transactions/phenomena/phantom-read

/transactions/isolation-level/serializable


## Swagger



url : localhost:3000/api-docs#/
<img width="1381" alt="스크린샷 2024-03-25 오후 7 32 32" src="https://github.com/eunchong2lee/NestJS-Concurrency/assets/104499306/9408a2c1-8c42-46d2-896b-7af114028c23">




## 트랜잭션이란?
`
트랜잭션은 데이터베이스에서 수행되는 일련의 작업 단위를 말한다.
트랜잭션은 하나 이상의 데이터베이스 작업을 논리적으로 그룹화하여, 이 작업들이
모두 성공하거나 모두 실패할 때만 Commit 또는 Rollback될 수 있도록 보장한다.
`

### ACID

일반적으로 트랜잭션은 ACID 속성을 따른다.
1. 원자성(Atomicity) : 트랜잭션은 일련의 작업을 원자적으로 실행합니다. 즉, 모든 작업이 성공하거나 모두 실패해야 한다. 하나의 작업이라도 실패하면 트랜잭션 전체가 롤백되어 이전 상태로 되돌린다.

2. 일관성(Consistency) : 트랜잭션이 완료된 후에도 데이터베이스는 일관된 상태를 유지해야 합니다. 즉, 트랜잭션 이전과 이후에도 데이터베이스의 무결성 규칙이 지켜져야 한다.

3. 고립성(Isolation) : 여러 트랜잭션이 동시에 실행될 때, 각 트랜잭션은 다른 트랜잭션의 영향을 받지 않고 실행되는 것처럼 보여야 한다. 이것은 한 트랜잭션이 다른 트랜잭션이 변경하는 데이터를 볼 수 없음을 의미한다.

4. 지속성(Durability) : 성공적으로 완료된 트랜잭션은 영구적으로 데이터베이스에 반영되어야 한다. 즉, 시스템 장애 또는 전원 공급 중단과 같은 상황에서도 데이터는 보존되어야 한다.



### 트랜잭션 격리수준(Isolation level)
`
트랜잭션 격리 수준은 여러 트랜잭션이 동시에 실행될 때 발생하는 문제를 해결하기 위한 데이터베이스 기능이다.
`

1. READ UNCOMMITTED
* 다른 트랜잭션이 변경 중인 데이터를 읽을 수 있습니다. 따라서 해당 데이터에 대해 일관성이 없을 수 있습니다.
* 이 수준은 데이터베이스 락을 사용하지 않기 때문에 성능이 가장 우수하지만, 데이터 무결성이 보장되지 않습니다.

2. READ COMMITTED
* 트랜잭션이 커밋된 데이터만 읽을 수 있습니다. 이전에 다른 트랜잭션이 변경한 데이터는 읽을 수 없습니다.
* 이 수준은 데이터 무결성이 보장되고, READ UNCOMMITTED보다는 높은 수준의 격리를 제공하지만, 여전히 동시성 문제가 발생할 수 있습니다.

3. REPEATABLE READ
* 트랜잭션이 시작될 때 읽은 데이터는 해당 트랜잭션이 완료될 때까지 변경되지 않습니다. 즉, 동일한 쿼리를 실행해도 결과가 항상 같습니다.
* 이 수준은 READ COMMITTED보다 높은 수준의 격리를 제공합니다. 따라서 더 많은 데이터 무결성을 보장하지만, 일부 동시성 문제는 여전히 발생할 수 있습니다.

4. SERIALIZABLE
* 가장 엄격한 격리 수준으로, 동시에 실행되는 트랜잭션 간의 충돌을 완전히 제거합니다. 따라서 동시성 문제가 발생하지 않습니다.
* 이 수준은 가장 높은 수준의 격리를 제공하지만, 동시성을 제어하기 위해 데이터베이스에서 락을 사용하기 때문에 성능에 영향을 줄 수 있습니다.


### 트랜잭션 락
`
락은 데이터베이스에서 동시성 제어를 달성하기 위해 사용된다. 여러 트랜잭션이 동일한 데이터를 동시에 엑세스할 떄 
데이터 일관성을 유지하기 위해 사용된다.
`

### 1. Pessimistic Locking(비관적 락)

비관적 락은 트랜잭션이 읽을 때 해당 데이터에 대한 락을 설정하여 다른 트랜잭션이 해당 데이터를 수정하지 못하도록 합니다.

TypeORM의 락 방식
- pessimistic_read (비관적 읽기 락)
  
트랜잭션이 읽은 데이터를 해당 트랜잭션이 종료될 때까지 다른 트랜잭션이 읽는 것을 허용하면서, 쓰기 또는 수정하는 것을 방지합니다.

- pessimistic_write (비관적 쓰기 락)
  
트랜잭션이 읽은 데이터를 해당 트랜잭션이 종료될 때까지 다른 트랜잭션이 읽기, 쓰기, 수정하는 것을 방지하며 접근하지 못하도록 합니다.

- dirty_read (더티 리드)

SERIALIZABLE isolation level에서 사용되는 Lock 모드로, 다른 트랜잭션이 커밋되지 않은 데이터를 읽는 것을 허용합니다.
다른 트랜잭션이 롤백할 경우, 읽은 데이터는 실제로 존재하지 않았던 것으로 간주됩니다.

- pessimistic_partial_write (비관적인 부분 쓰기 락)
  
엔티티의 일부분에 대한 쓰기 작업에만 강력한 Lock을 적용합니다.
부분적인 쓰기 락을 설정하여 특정 필드만 다른 트랜잭션이 수정하지 못하도록 합니다.

- pessimistic_write_or_fail (비관적인 쓰기 락 또는 실패)
  
쓰기 작업을 시도하고 실패할 경우 예외를 발생시킵니다.
다른 트랜잭션이 해당 데이터에 쓰기 작업을 수행 중이면 예외가 발생합니다.

- for_no_key_update (키 업데이트 없음)
  
엔티티의 키에 대한 업데이트를 허용하지 않습니다.
키 필드가 변경되면 해당 엔티티의 저장이 실패합니다.

- for_key_share (키 공유)
  
읽기 작업에 대한 Lock을 걸지 않고, 엔티티의 키만을 공유 Lock으로 설정합니다.
다른 트랜잭션이 해당 엔티티를 읽는 것을 허용하지만, 키에 대한 수정을 막습니다.

### 2. Optimistic Locking(낙관적 락)

version을 통해 동시성 문제가 실제로 발생했을 경우에 그때 충돌여부를 확인해 처리하는 것이다.

